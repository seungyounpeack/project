package kr.go.guri.manager.noticeMng.insNotice.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;
import kr.go.guri.cmm.vo.FileVO;
/**
 * 관리자 > 공지사항 등록 Mapper 클래스
 * @author 권기완
 * @since 2022. 06. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.06.25.   	권기완          최초 생성
 *   
 * </pre>
 */
@Repository("insNoticeMapper")
public class InsNoticeMapper extends ComAbstractDAO {

	public int selectPk() {
		// TODO Auto-generated method stub
		return selectOne("InsNoticeDAO.selectPk");
	}

	public int saveNotice(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return insert("InsNoticeDAO.saveNotice", param);
	}

	public int noticeFileUp(FileVO fileVO) {
		// TODO Auto-generated method stub
		return insert("InsNoticeDAO.noticeFileUp", fileVO);
	}

}
