package kr.go.guri.manager.noticeMng.noticeMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.go.guri.manager.noticeMng.noticeMng.service.NoticeMngService;
/**
 * 관리자 > 공지사항 Service Implement 클래스
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
 *  2022.06.25.   	권기완          최초 생성
 *   
 * </pre>
 */
@Service("noticeMngService")
public class NoticeMngServiceImpl implements NoticeMngService {

	@Resource(name = "noticeMngMapper")
	private NoticeMngMapper noticeMngMapper;
	
	@Override
	public List<Map<String, Object>> selectNoticeList(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return noticeMngMapper.selectNoticeList(param);
	}

	@Override
	@Transactional
	public int deleteNoticeList(EgovMap map) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return noticeMngMapper.deleteNoticeList(map);
	}

	@Override
	@Transactional
	public int deleteNoticeListFile(EgovMap map) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return noticeMngMapper.deleteNoticeListFile(map);
	}

}
