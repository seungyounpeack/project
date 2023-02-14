package kr.go.guri.manager.noticeMng.noticeMng.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.go.guri.cmm.service.impl.ComAbstractDAO;
/**
 * 관리자 > 공지사항 Mapper 클래스
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
@Repository("noticeMngMapper")
public class NoticeMngMapper extends ComAbstractDAO {

	public List<Map<String, Object>> selectNoticeList(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return selectList("NoticeMngDAO.selectNoticeList", param);
	}

	public int deleteNoticeList(EgovMap map) {
		// TODO Auto-generated method stub
		return delete("NoticeMngDAO.deleteNoticeList", map);
	}

	public int deleteNoticeListFile(EgovMap map) {
		// TODO Auto-generated method stub
		return delete("NoticeMngDAO.deleteNoticeListFile", map);
	}

}
