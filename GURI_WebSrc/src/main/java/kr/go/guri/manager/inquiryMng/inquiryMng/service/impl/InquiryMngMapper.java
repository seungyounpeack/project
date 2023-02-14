package kr.go.guri.manager.inquiryMng.inquiryMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.go.guri.cmm.service.impl.ComAbstractDAO;
/**
 * 관리자 > 문의 Mapper 클래스
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
@Repository("inquiryMngMapper")
public class InquiryMngMapper extends ComAbstractDAO {

	public List<Map<String, Object>> selectInquiryList(Map<String, Object> param) throws SQLException , IOException{
		// TODO Auto-generated method stub
		return selectList("InquiryMngDAO.selectInquiryList", param);
	}

	public int deleteInquiryList(EgovMap map) throws SQLException , IOException{
		// TODO Auto-generated method stub
		return delete("InquiryMngDAO.deleteInquiryList", map);
	}

}
